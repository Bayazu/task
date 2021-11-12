import React, {useState} from 'react';
import {MenuItems} from "./MenuItems";
import './Navbar.css'
//import {Button} from "../../../../../hakaton/frontend/src/components/Button/Button";
import Modal from "../Modal/Modal";

const Navbar = () => {

    const [clicked, setClicked] = useState(false)
    const [modalActive, setModalActive] = useState(false)

    return (
        <nav className='NavbarItems'>
            <h1 className="navbar-logo">Ремем Country<i className=''></i></h1>

            <div className='menu-icon' onClick={() => setClicked(!clicked)}>
                <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>
            <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                {MenuItems.map((item, index) => {
                    return (
                        <li key={index}>
                            <a className={item.cName} href={item.url}>
                                {item.title}
                            </a>
                        </li>
                    )
                })}
            </ul>
            {/*<Button onClick={() => setModalActive(true)}>Боитесь забыть о поступлении?</Button>*/}

            <Modal active={modalActive} setActive={setModalActive}>

                <div>
                    тут будет регистрация
                </div>
                {/*<div>*/}
                {/*    Если вы боитесь что-то забыть или пропустить, то введите свой email и вам будут приходить*/}
                {/*    уведомления о всех важных событиях*/}
                {/*</div>*/}

                {/*<form ref={form} onSubmit={sendEmail}>*/}
                {/*    <label>ФИО</label>*/}
                {/*    <input type="text" name="name" className="type-1"/>*/}
                {/*    <label>Email</label>*/}
                {/*    <input type="email" name="user_email" className="type-1"/>*/}
                {/*    <input type="submit" value="Send" className="type-1" onClick={() => {*/}
                {/*        setModalActive(false)*/}
                {/*    }}/>*/}
                {/*    <label>Я соглашаюсь с обработкой персональных данных*/}
                {/*        <input type="checkbox"/>*/}
                {/*        <span></span>*/}
                {/*    </label>*/}
                {/*</form>*/}
            </Modal>

        </nav>
    );
};


export default Navbar;