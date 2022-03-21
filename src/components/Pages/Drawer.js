import { Link } from "react-router-dom";
import "../Pages/Drawer.css";

function scrolldiv() {
  var elem = document.getElementById("ele");
  elem.scrollIntoView();
}

function scrolldiv2() {
  var elem = document.getElementById("contact");
  elem.scrollIntoView();
}

function Drawer(props) {
  return (
    <>
      <div
        onClick={() => {
          props.handleShow();
        }}
        className={`${
          props.value == true ? " div2" : "myclosed"
        }   fixed  z-30 left-0 top-0 h-screen`}
      ></div>
      <div
        className={`${
          props.value == true ? " div1" : "myclosed"
        } fixed z-30 left-0 top-0 h-screen`}
      >
        <main className="flex flex-col gap-12">
          <aside>
            <ul className="asideList">
              <Link
                to={"/"}
                className="hover:text-green-600 cursor-pointer z-10"
                onClick={() => {
                  props.handleShow();
                }}
              >
                <li
                  className={`${
                    props.value == true ? "block" : "hidden"
                  }  cursor-pointer transition-all duration-300 w-full hover:bg-white hover:text-black h-14 flex justify-center items-center text-white text-xl font-semibold bg-green-900`}
                >
                  <a className="asideAnchor">Home</a>
                </li>
              </Link>
              <hr></hr>

              {props.custom === true ? (
                localStorage.getItem("token")&&<Link
                  to={"/order"}
                  onClick={() => {
                    props.handleShow();
                  }}
                  className="hover:text-green-600 cursor-pointer z-10"
                >
                  <li
                    className={`${
                      props.value == true ? "block" : "hidden"
                    }  cursor-pointer transition-all duration-300 w-full hover:bg-white hover:text-black h-14 flex justify-center items-center text-white text-xl font-semibold bg-green-900`}
                  >
                    <a className="asideAnchor">Orders</a>
                  </li>{" "}
                </Link>
              ) : (
                <li
                  onClick={() => {
                    scrolldiv();
                    props.handleShow();
                  }}
                  className={`${
                    props.value == true ? "block" : "hidden"
                  }  cursor-pointer transition-all duration-300 w-full hover:bg-white hover:text-black h-14 flex justify-center items-center text-white text-xl font-semibold bg-green-900`}
                >
                  <a className="asideAnchor">About</a>
                </li>
              )}
              <hr></hr>

              {props.custom === true ? (
                <li
                  className={`${
                    props.value == true ? "block" : "hidden"
                  } cursor-pointer transition-all duration-300 w-full hover:bg-white hover:text-black h-14 flex justify-center items-center text-white text-xl font-semibold bg-green-900`}
                >
                  <a
                    href="tel:+2348148092423"
                    className="asideAnchor cursor-pointer z-10"
                  >
                    {" "}
                    <div>Contact</div>
                  </a>
                </li>
              ) : (
                <li
                  onClick={() => {
                    props.handleShow();
                    scrolldiv2();
                  }}
                  className={`${
                    props.value == true ? "block" : "hidden"
                  } cursor-pointer transition-all duration-300 w-full hover:bg-white hover:text-black h-14 flex justify-center items-center text-white text-xl font-semibold bg-green-900`}
                >
                  <a className="asideAnchor">Contact</a>
                </li>
              )}
              <hr></hr>
            { localStorage.getItem("token")?<Link
                to={"/login"}
                className="hover:text-green-600 cursor-pointer z-10"
                onClick={() => {
                  props.handleShow();
                  localStorage.clear()
                }}
              >
                <li
                  className={`${
                    props.value == true ? "block" : "hidden"
                  }  cursor-pointer transition-all duration-300 w-full hover:bg-white hover:text-black h-14 flex justify-center items-center text-white text-xl font-semibold bg-green-900`}
                >
                  <a className="asideAnchor">Logout</a>
                </li>
              </Link>:
            <Link
                to={"/login"}
                className="hover:text-green-600 cursor-pointer z-10"
              >
                <li
                  className={`${
                    props.value == true ? "block" : "hidden"
                  }  cursor-pointer transition-all duration-300 w-full hover:bg-white hover:text-black h-14 flex justify-center items-center text-white text-xl font-semibold bg-green-900`}
                >
                  <a className="asideAnchor">Login</a>
                </li>
              </Link>}
            </ul>
          </aside>
          <section>
            <div
              className={`${
                props.value == true ? "block" : "hidden"
              } text-white text-sm font-semibold z-10  p-2`}
            >
              <h1>© 2022 Fybe. All rights reserved.</h1>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default Drawer;
