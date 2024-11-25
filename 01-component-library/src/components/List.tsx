import React from 'react';

interface ListProps<T> {
  /** The items to render in the list */
  items: ReadonlyArray<T>;
  /** The function to filter the items */
  filter?: (item: T, index: number) => boolean;
  /** The function to render react element from */
  render: (item: T, index: number) => React.ReactNode;
}

type ListErrorType = {
  type: "error" | "empty_error" | "filter_error" | "render_error";
  message: string;
}

/*
  List component
  * @param {T} items - The items to render in the list
  * @param {function} filter - The function to filter the items
  * @param {function} render - The function to render react element from
*/
const List = <T extends unknown>({
  items,
  filter,
  render,
}: ListProps<T>): JSX.Element => {

  const [error, setError] = React.useState<ListErrorType | null>(null);

  //function to validate the error
  const validateError = (): boolean => {
    let isValid = true;
    if (!items || items.length === 0) {
      setError({ type: "empty_error", message: "items prop is required" });
      isValid = false;
    }

    if (!render) {
      setError({ type: "render_error", message: "render prop is required" });
      isValid = false;
    }

    if (filter && typeof filter !== "function") {
      setError({ type: "filter_error", message: "filter prop must be a function" });
      isValid = false;
    }

    return isValid;
  }

  //function to filter the array
  const filterArray = (array: ReadonlyArray<T>, predicate: (value: T, index: number) => boolean): ReadonlyArray<T> => {
    validateError();
    return array.filter(predicate);
  }

  const filteredItems = filter ? filterArray(items, (item, index) => filter(item, index)) : items;

  //function to render the error message
  const renderError = (error: ListErrorType) => (
    <p>Error: {error.message}</p>
  )

  if (error) return renderError(error);

  return (
    <ul>
      {filteredItems.map((item, index) => (
        <li key={index}>
          {render(item, index)}
        </li>
      ))}
    </ul>
  )
};

export default List;