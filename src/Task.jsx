export default function Task(props) {
  return (
    <>
      {props.todo.map((to) => {
        return (
          <p className="task" key={to.id}>
            {to.cont}{" "}
            <button
              onClick={() => {
                props.del(to.id);
              }}
            >
              Delete
            </button>
          </p>
        );
      })}
    </>
  );
}
