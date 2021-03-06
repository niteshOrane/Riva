import React from 'react';
import { useDispatch } from 'react-redux';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { logoutUser } from '../../../services/auth/auth.service';
import * as icons from "../../common/Icons/Icons";
import { logout, emptyCart } from '../../../store/actions/auth';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { clearwishlist_action } from '../../../store/actions/wishlist';



const MenuListComposition = React.memo(({ auth, history, openSignUpCard,translate }) => {
    const dispatch = useDispatch();
    const { isAuthenticated, customer } = auth;

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        if (isAuthenticated) {
            setOpen((prevOpen) => !prevOpen);

        }
        else {
            openSignUpCard('')
        }

    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };
    const handleLogout = (event) => {
        sessionStorage.clear();
        dispatch(logout());
        dispatch(emptyCart());
        logoutUser();
        handleClose(event);
        dispatch(clearwishlist_action([]))
        
    };
    const handleMyProfile = (event) => {
        history.push('/dashboard')
        handleClose(event);
    };
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <span style={{ zIndex: 1 }} className="d-flex align-items-center gap-12" ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}>

            <span  className=" personIcon material-icons-outlined font-light-black">
                person
            </span>
            <span className="align-self-end font-light-black d-flex underline-hovered " >
                {' '}
                {isAuthenticated ? <><span>{`${translate?.nav?.WEL} ${customer.firstname || customer?.username}`} </span>
                    <span style={{marginRight:"15px"}}   className="material-icons-outlined"> keyboard_arrow_down</span>
                </> : <div >{isAuthenticated ? translate?.nav?.WEL:null} {translate?.nav?.IN} &nbsp; &nbsp;</div>}

            </span>

            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow"
                                    onKeyDown={handleListKeyDown}>
                                    <MenuItem onClick={handleMyProfile}><span className="material-icons-outlined font-light-black">
                                        person
                                    </span>{translate?.nav?.MYAC}</MenuItem>
                                    <MenuItem onClick={handleLogout}> <span className="material-icons-outlined font-light-black">
                                        logout
                                    </span>{translate?.nav?.LOG}</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </span>
    );
})
export default MenuListComposition