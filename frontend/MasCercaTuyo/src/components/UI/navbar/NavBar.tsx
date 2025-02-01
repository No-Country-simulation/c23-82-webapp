export function NavBar() {
  return (
    <div style={{
      backgroundColor: 'black',
      height: '10vh',
      color: 'white'
    }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          //justifyContent: "space-between",
          alignItems: "center",
          justifyContent: "center",
          padding: "1% 1%",
          gap: "5%"
        }}
      >
        <button
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "5%"
          }}
        >
          <img
            src="img/category.png"
            alt={"category"}
            style={{
              width: "30px",
              height: "30px"
            }}
          />
          Caterogias
        </button>
        <button
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "5%"
          }}
        >
          <img
            src="img/aboutme.png"
            alt={"category"}
            style={{
              width: "30px",
              height: "30px"
            }}
          />
          Quienes Somos
        </button>
        <button
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "5%"
          }}
        >
          <img
            src="img/testimonios.png"
            alt={"category"}
            style={{
              width: "30px",
              height: "30px"
            }}
          />
          Testimonios de la comunidad
        </button>
        <button
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "5%"
          }}
        >
          <img
            src="img/help.png"
            alt={"category"}
            style={{
              width: "30px",
              height: "30px"
            }}
          />
          Soporte
        </button>
      </div>
    </div>
  );
}