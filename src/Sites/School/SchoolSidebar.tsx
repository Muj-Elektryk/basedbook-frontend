import React, {useEffect, useRef, useState} from "react";
import LinkSection from "../../Components/LinkSection";
import * as Icon from "react-bootstrap-icons";
import classes from "./SchoolSidebar.module.css";

const Sidebar = () => {
    const navbarRef = useRef<HTMLDivElement>(null);
    const [grades, setGrades] = useState<any[]>([]);
    const [lastGrades, setLastGrades] = useState<any[]>([]);
    const [luckyNumber, setLuckyNumber] = useState();

    useEffect(() => {
        getLuckyNumber();
        getAllGrades();
        getLastGrades();
    }, []);

    async function getAllGrades() {
        try {
            await fetch("http://localhost:3000/school/grades", {
                method: "GET",
                credentials: "include",
            })
                .then((res) => res.json())
                .then((data) => setGrades(data.grades));
        } catch (error) {
            console.error(error);
        }
    }

    async function getLastGrades() {
        try {
            await fetch("http://localhost:3000/school/grades?last=5", {
                method: "GET",
                credentials: "include",
            })
                .then((res) => res.json())
                .then((data) => setLastGrades(data.grades));
        } catch (error) {
            console.error(error);
        }
    }

    async function getLuckyNumber() {
        try {
            await fetch("http://localhost:3000/school/lucky-number", {
                method: "GET",
                credentials: "include",
            })
                .then((res) => res.json())
                .then((data) => setLuckyNumber(data.number));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className={classes.navbar} ref={navbarRef}>
                <div>
                    <LinkSection
                        elements={[
                            {
                                destination: "/school/grades",
                                label: "Oceny",
                                icon: <Icon.Icon1CircleFill/>,
                            },
                            {
                                destination: "/school/attendance",
                                label: "Frekwencja",
                                icon: <Icon.Fingerprint/>,
                            },
                            {
                                destination: "/school/exams",
                                label: "Sprawdziany",
                                icon: <Icon.PenFill/>,
                            },
                            {
                                destination: "/school/lessons",
                                label: "Plan lekcji",
                                icon: <Icon.Calendar3RangeFill/>,
                            },
                            {
                                destination: "/school/messages",
                                label: "Wiadomości",
                                icon: <Icon.ChatLeftFill/>,
                            },
                        ]}
                    />
                </div>
                <div className={classes.stats}>
                    {luckyNumber !== 0 ? (
                        <div className={classes.stat}>
                            Szczęśliwy numerek: {luckyNumber}
                        </div>
                    ) : (
                        <></>
                    )}
                    <div className={classes.stat}>
                        Ostatnie oceny:
                        <div className={classes.stat}>
                            {lastGrades.map((grade) => {
                                return (
                                    <p key={grade.id}>
                                        {grade.column.subject.name}: {grade.value}
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                    <p className={classes.stat}>
                        Średnia ocen:{" " +
                        grades.reduce((a, b) => {
                            if (!isNaN(+b.content)) {
                                return a + +b.content;
                            } else {
                                return a;
                            }
                        }, 0) / grades.length}
                    </p>
                    <p className={classes.stat}>
                        Dni do wakacji:
                        {' ' + Math.ceil(
                            (new Date("06/24/2023").getTime() - new Date().getTime()) /
                            (1000 * 3600 * 24)
                        )}
                    </p>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
