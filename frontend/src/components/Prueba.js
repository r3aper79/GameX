import React from "react";
import Chat from "./Chat";
class Prueba extends React.Component {

  render() {
    return (
      <>
        <div className="containPageHome" style={{ backgroundImage: "url(../assets/fondo.png)" }}>
          <Chat />
       
        </div>
      </>
    );
  }
}


export default Prueba;
