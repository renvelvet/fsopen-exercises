const Header = ({ name }) => <h2>{name}</h2>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) =>
  parts.map((part) => <Part key={part.id} part={part} />);

const Total = ({ sum }) => <b>total of {sum} exercises</b>;

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total
        sum={course.parts.reduce((sum, part) => sum + part.exercises, 0)}
      />
    </>
  );
};

export default Course;
