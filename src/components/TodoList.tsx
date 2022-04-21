import React, { useState } from "react";
import {
  makeStyles,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from "@material-ui/icons/Edit";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import RadioButtonUncheckedOutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";

import { Todo, User } from "../state/state";
import { useGlobalContext } from "../state/context";
import {
  GET_EDIT_AND_REFRESH_TODO,
  DELETE_AND_REFRESH_TODO,
} from "../state/actions";
import { editTodo } from "../Util/Todo";
import AddTask from "./AddTask";

const useStyles = makeStyles({
  table: {
    marginTop: "32px",
    marginBottom: "32px",
  },
});

interface Payload {
  name: string;
  user: string;
  isComplete: boolean;
}

export default function TodoList() {
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState<Payload>({
    name: "",
    user: "",
    isComplete: false,
  });

  const classes = useStyles();
  const globalContext = useGlobalContext();
  if (!globalContext) return null;

  const { state, dispatch } = globalContext;
  const { todos, users } = state;

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  function handleFilter(e: React.MouseEvent) {
    const target = e.currentTarget.childNodes[0].nodeValue;
    // console.log("e.currentTarget: ", e.currentTarget);
    if (!target) return;
  }

  function handleEdit(e: React.MouseEvent) {
    const id = e.currentTarget
      .getAttribute("data-edit")
      ?.split("-")[1] as string;

    dispatch({ type: GET_EDIT_AND_REFRESH_TODO, payload: { id: id } });
  }

  function handleDelete(e: React.MouseEvent) {
    const id = e.currentTarget.getAttribute("data-delete")?.split("-")[1];
    if (id) {
      dispatch({ type: DELETE_AND_REFRESH_TODO, payload: { id: id } });
    }
  }

  return (
    <TableContainer className={classes.table} component={Paper}>
      <Table aria-label="todo table">
        <TableHead>
          <TableRow>
            <TableCell onClick={handleFilter}>Project Name</TableCell>
            <TableCell align="center" onClick={handleFilter}>
              User
            </TableCell>
            <TableCell align="center" onClick={handleFilter}>
              Completed
            </TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.length > 0 ? (
            todos.map((todo) => {
              const filterResult: User = Object.values(users).filter((user) => {
                return user.id === todo.user;
              })[0];

              return (
                <TableRow hover key={todo.id}>
                  <TableCell scope="row">{todo.name}</TableCell>
                  <TableCell align="center">
                    {`${filterResult?.firstName} ${filterResult?.lastName}`}
                  </TableCell>
                  <TableCell align="center">
                    {todo.isComplete ? (
                      <CheckCircleOutlineOutlinedIcon color="primary" />
                    ) : (
                      <RadioButtonUncheckedOutlinedIcon color="primary" />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <CancelIcon
                      data-delete={`Delete-${todo.id}`}
                      color="primary"
                      onClick={handleDelete}
                    />
                    <EditIcon
                      data-edit={`Edit-${todo.id}`}
                      color="primary"
                      onClick={handleEdit}
                    />
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
      <Modal open={open} onClose={handleModalClose}>
        <AddTask handleModalClose={handleModalClose} />
      </Modal>
    </TableContainer>
  );
}

function useEffects(arg0: () => void, arg1: Payload[]) {
  throw new Error("Function not implemented.");
}
// CheckCircleOutlineOutlinedIcon
// RadioButtonUncheckedOutlinedIcon
