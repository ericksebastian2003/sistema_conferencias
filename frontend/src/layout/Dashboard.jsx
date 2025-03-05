import { Link, Outlet, useLocation } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../context/AuthProvider"
import { IoExit } from "react-icons/io5";

const Dashboard = () =>{
    const location = useLocation()
    const urlActual = location.pathname
    const {auth} = useContext(AuthContext)
    const autenticado = localStorage.getItem('token')
    return (
        <div className="flex min-h-screen bg-gray-100">
        
          <aside className="w-64 bg-sky-900 text-yellow-400 p-6 flex flex-col items-center">
            
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXUr2Fz1AFEcaf8Fxz5rH16BMY3LLOz4ulKA&s"
              alt="img-user"
              className="mt-4 p-1 border-2 border-white rounded-full"
              width={100}
              height={100}
            />
            <p className="text-white text-center my-4 text-sm">
              Bienvenido ,  {auth?.nombre}
            </p>
            <hr className="border-slate-400 w-full" />
            <ul className="mt-6 w-full space-y-3">
              {[
                { path: "/dashboard/conferencistas ", label: "Conferencistas" },
                { path: "/dashboard/auditorios", label: "Auditorios" },
                { path: "/dashboard/reservas", label: "Reservas" },
              ].map((item) => (
                <li key={item.path} className="text-center">
                  <Link
                    to={item.path}
                    className={`block py-3 rounded-lg text-lg font-semibold transition-all ${
                      urlActual === item.path
                        ? "bg-gray-900 text-slate-200"
                        : "text-slate-400 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    
                    {item.label}
                  </Link>
                  
                </li>
              ))}
              
            </ul>
            <button onClick={()=>{
              localStorage.removeItem('token')
          }}
          className="mt-auto w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg text-lg font-semibold transition-all"
        >
          <IoExit />
          <Link to="/">Salir</Link>
        </button>
          </aside>
    
          <div className="flex-1 flex flex-col">
            <header className=" h-30 bg-sky-900  py-4 px-8 flex">
              
            </header>
            <main className="flex-1 overflow-y-auto p-6">
              {autenticado ? <Outlet /> : <Navigate to="/login" />}
            </main>
          </div>
        </div>
      );
    };
    
    export default Dashboard;