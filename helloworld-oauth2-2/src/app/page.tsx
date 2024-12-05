"use client"
// import styles from "./page.module.scss";

export default function Home() {

  const buttonClickHandler = () => {
    alert("HelloWorld");
  }

  return (
    <>
      <h1>HelloWorld</h1>
      <button onClick={buttonClickHandler}>Click</button>
    </>
  );
}
