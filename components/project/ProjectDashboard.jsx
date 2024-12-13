"use client"
import { formatNumberToColones } from "/functions/others/moneyFormat";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import Task from "./Task";
import Employee from "./Employee";
import style from "/css/projectDashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import ModalAddEmployees from "./AddEmployees";
import { useContext } from "react";
import { ProjectContext } from "./context/ProjectContext";
import { CircularProgress } from "@nextui-org/progress";
import ExpensesModal from "./Expenses";
import BudgetsModal from "./Budgets";
import CreateFormTask from "./CreateTaskModal";


export default function ProjectDashboard() {
    const { project } = useContext(ProjectContext);
    const { percentage, employees, tasks, projectBudgets, expensesProjects } = project;
    const expense = expensesProjects.reduce((acc, expense) => acc + expense.amount, 0);
    const budget = projectBudgets.reduce((acc, earn) => acc + earn.amount, 0);



    return (
        <div className={style.container}>
            <div className={style.overviewProject}>
               <BudgetsModal budget={budget} formatNumberToColones={formatNumberToColones}/>
                <ExpensesModal expense={expense} formatNumberToColones={formatNumberToColones} />
                <div>
                    <div>
                        <h3>Saldo restante</h3>
                        <p>{formatNumberToColones(budget - expense)}</p>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faWallet} />
                    </div>
                </div>
            </div>
            <div className={style.overviewGraphs}>
                <CircularProgress
                    classNames={{
                        svg: "w-full h-full drop-shadow-md",
                        indicator: "stroke-[#F1B217]",
                        track: "stroke-white/10",
                        value: "text-3xl font-semibold text-white",
                    }}
                    value={parseInt(percentage)}
                    strokeWidth={4}
                    showValueLabel={true}
                />
            </div>
            <div className={style.tasksContainer}>
                <div className={style.taskHeader}>
                    <h3>Tareas</h3>
                    <CreateFormTask modalTitle={"Agregar tarea"} />
                </div>
                <div className={style.tasks}>
                    <div className={style.informationTasks}>
                        <h4>Nombre</h4>
                        <p>Fecha Límite</p>
                        <p>Estado</p>
                        <p>Encargados</p>
                    </div>
                    <ScrollShadow className="w-full flex gap-5 flex-col">
                        {!tasks || tasks.length === 0  ? <p className="font-bold">No hay tareas creadas</p> : tasks.map(task => (
                            <Task {...task} />
                        ))}
                    </ScrollShadow>
                </div>
            </div>
            <div className={style.projectFiles}>

            </div>

            <div className={style.employeesContainer}>
                <div className={style.employeeHeader}>
                    <h3>Empleados Asignados</h3>
                    <ModalAddEmployees />
                </div>
                <div className={style.employees}>
                    <div className={style.informationEmployees}>
                        <h4>Nombre</h4>
                        <p>Puesto</p>
                        <p>Correo</p>
                    </div>
                    <ScrollShadow className="w-full flex gap-5 flex-col">
                        {!employees || employees.length === 0 ? <p className="font-bold">No hay empleados asignados</p> : employees.map(employee => (
                            <Employee 
                                {...employee}
                            />
                        ))}
                    </ScrollShadow>
                </div>
            </div>
        </div>
    )
}