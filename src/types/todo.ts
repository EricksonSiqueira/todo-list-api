export interface Todo {
  id: number;
  title: string;
  description: string;
  done: number;
}

export interface EditTodo {
  title?: string;
  description?: string;
  done?: number;
}

export interface AddTodo {
  title: string;
  description: string;
}
