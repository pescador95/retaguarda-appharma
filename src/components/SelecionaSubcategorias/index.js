import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ProdSubHandler from '../../Helpers/ProdutoSubcategoriaHandler'
import { useSelector } from 'react-redux'
import useApi from '../../Helpers/AppharmaApi'


function App({ id_produto }) {
    const [columns, setColumns] = useState({});

    const token = useSelector(state => state.userReducer.token);

    const api = useApi();

    useEffect(() => {
        carregaSubcategorias()
        
    }, [id_produto])

    

    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination, draggableId } = result;

        ProdSubHandler(token, id_produto, source, draggableId);

        if (source.droppableId !== destination.droppableId) {

            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            });

        } else {

            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            });
        }
    };

    const carregaSubcategorias = async () => {


        const free = await api.getSubcategoriasProduto(token, id_produto, 'free');
        const select = await api.getSubcategoriasProduto(token, id_produto, 'outros');

        const colunaAux = {
            1: {
                name: "Disponiveis",
                items: free
            },
            2: {
                name: "Selecionadas",
                items: select
            }
        };

        setColumns(colunaAux);

    }


    return (


        <div style={{ display: "flex", flex: 1, justifyContent: "center", height: "100%" }}>

            <DragDropContext
                onDragEnd={result => onDragEnd(result, columns, setColumns)}
            >
                {Object.entries(columns).map(([columnId, column], index) => {
                    return (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                            }}
                            key={columnId}
                        >
                            <div style={{ marginTop: 10, marginBottom: 5, fontFamily: 'Roboto Normal' }}>{column.name}</div>
                            {}
                            <div style={{ margin: 5 }}>
                                <Droppable droppableId={columnId} key={columnId} >
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    flexDirection: 'column',
                                                    background: snapshot.isDraggingOver
                                                        ? "lightblue"
                                                        : "lightgrey",
                                                    padding: 5,
                                                    paddingTop: 10,
                                                    width: 250,
                                                    height: 500,
                                                    maxHeight: 500,
                                                    borderRadius: 5,
                                                    overflow: 'auto'

                                                }}
                                            >
                                                {column.items.map((item, index) => {
                                                    return (
                                                        <Draggable
                                                            key={item.id}
                                                            draggableId={item.id.toString()}
                                                            index={index}
                                                        >
                                                            {(provided, snapshot) => {
                                                                return (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={{
                                                                            display: 'flex',
                                                                            textAlign:'center',
                                                                            justifyContent: 'center',
                                                                            alignItems: 'center',
                                                                            userSelect: "none",
                                                                            width: 150,
                                                                            height: 80,
                                                                            borderRadius: 5,
                                                                            padding: 20,
                                                                            fontSize: 12,
                                                                            margin: "0 0 8px 0",
                                                                            minHeight: "15px",
                                                                            backgroundColor: snapshot.isDragging
                                                                                ? "#263B4A"
                                                                                : "#456C86",
                                                                            color: "white",
                                                                            ...provided.draggableProps.style
                                                                        }}
                                                                    >
                                                                        {item.content}
                                                                    </div>
                                                                );
                                                            }}
                                                        </Draggable>
                                                    );
                                                })}
                                                {provided.placeholder}
                                            </div>
                                        );
                                    }}
                                </Droppable>
                            </div>
                        </div>
                    );
                })}
            </DragDropContext>

        </div>

    );
}

export default App;
