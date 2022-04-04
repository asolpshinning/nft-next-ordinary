import { ActionsCell } from "./actions/ActionsCell";
import { MediaCell } from "./cells/media-cell";
import { Code, Text } from "@chakra-ui/react";
import { BigNumber } from "ethers";
import React from "react";

export function generateCollectionableColumns() {
  return [
    {
      Header: "ID",
      accessor: (row) => row.metadata.id.toString(),
    },
    {
      Header: "Media",
      accessor: (row) => row.metadata,
      Cell: MediaCell,
    },
    { Header: "Name", accessor: (row) => row.metadata.name },
    {
      Header: "Description",
      accessor: (row) => row.metadata.description,
    },
    {
      Header: "Properties",
      accessor: (row) => row.metadata.properties,
      Cell: ({ cell }) => (
        <Code whiteSpace="pre">{JSON.stringify(cell.value, null, 2)}</Code>
      ),
    },
    {
      Header: "Supply",
      accessor: (row) => row.supply.toString(),
      Cell: ({ cell }) => {
        return (
          <Text size="label.sm">{BigNumber.from(cell.value).toString()}</Text>
        );
      },
    },
    {
      Header: "Actions",
      id: "actions",
      Cell: ActionsCell || null,
    },
  ];
}
