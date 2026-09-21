export default function MyProfile({ textInfo, avatarInfo }) {
  // de-structuring ( phan ra cau truc cua 1 properties)

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 text-center">
        <h1 className="text-dark">Hello, My Profile!</h1>
        <img
          alt={avatarInfo.alt}
          width={200}
          height={200}
          src={avatarInfo.src}
        />
      </div>
    </>
  );
}

export function MySubjects() {
  // Array
  const subjects = ["ReactJS", "NodeJS", "Java"];

  // Object
  const subjectsV2 = [
    { id: 1, name: "ReactJS", combo: "JS" },
    { id: 2, name: "NodeJS", combo: "JS" },
    { id: 3, name: "Java", combo: "OOP" },
  ];

  const jsSubjects = subjectsV2.filter((js) => js.combo === "JS");

  return (
    <>
      <h2>My Subjects</h2>
      <ul>
        {jsSubjects.map((s) => (
          <li key={s.id}> {s.name} </li>
        ))}
      </ul>
      <ul>
        {subjects.map((s, index) => (
          <li key={index}> {s} </li>
        ))}
      </ul>
    </>
  );
}
