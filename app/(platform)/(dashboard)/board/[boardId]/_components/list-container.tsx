"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import { ListForm } from "./list-form";
import { ListItem } from "./list-item";
import { updateCardOrder } from "@/actions/update-card-order";
import { updateListOrder } from "@/actions/update-list-order";
import { useAction } from "@/hooks/use-action";
import { ListWithCards } from "@/types";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list); //creating a shallow copy
  const [removed] = result.splice(startIndex, 1); //removing element from its original index
  result.splice(endIndex, 0, removed); //adding the element to its desired index

  return result;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);

  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: () => toast.success("List reordered"),
    onError: (error) => toast.error(error),
  });
  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess: () => toast.success("Card reordered"),
    onError: (error) => toast.error(error),
  });

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;
    if (!destination) return;

    //if dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    //user moves a list
    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index }),
      );

      setOrderedData(items);
      executeUpdateListOrder({ items, boardId });
    }

    //user moves a card
    if (type === "card") {
      let newOrderedData = [...orderedData];

      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId,
      );
      const destinationList = newOrderedData.find(
        (list) => list.id === destination.droppableId,
      );

      if (!sourceList || !destinationList) return;

      //check if card exists in the source list
      if (!sourceList.cards) sourceList.cards = [];

      //check if cards exists in the destinationList
      if (!destinationList.cards) sourceList.cards = [];

      //moving card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index,
        );

        reorderedCards.forEach((card, index) => {
          card.order = index;
        });
        sourceList.cards = reorderedCards;

        setOrderedData(newOrderedData);
        executeUpdateCardOrder({ items: reorderedCards, boardId });
      } else {
        //moving card to another list
        const [movedCard] = sourceList.cards.splice(source.index, 1); //removing card from source list
        movedCard.listId = destination.droppableId; //assign new listId to the moved card
        destinationList.cards.splice(destination.index, 0, movedCard); //add card to the destination list

        //updating the order of cards in source list and destination list based on the movement and placement of the card
        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });
        destinationList.cards.forEach((card, index) => {
          card.order = index;
        });

        setOrderedData(newOrderedData);
        executeUpdateCardOrder({ items: destinationList.cards, boardId });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedData.map((list, index) => {
              return <ListItem key={list.id} index={index} data={list} />;
            })}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shring-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
