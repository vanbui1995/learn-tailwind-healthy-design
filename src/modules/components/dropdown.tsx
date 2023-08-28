import { MENU_BAR_ITEMS, ROUTE_PATH } from '@/enums';
import { Fragment, MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';


function useComponentVisible(initialIsVisible: boolean) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef<unknown>(null);

    const exceptionRef = useRef<unknown>(null);

    const handleHideDropdown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setIsComponentVisible(false);
        }
    }, []);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (event.target === exceptionRef.current) {
            setIsComponentVisible((s) => {
                return !s;
            });
            return;
        }
        console.log(ref.current);
        if (ref.current) {
            setIsComponentVisible(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleHideDropdown, true);
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('keydown', handleHideDropdown, true);
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [handleClickOutside, handleHideDropdown]);

    return { ref, isComponentVisible, setIsComponentVisible, exceptionRef };
}

const Dropdown = () => {
    const { ref, isComponentVisible, setIsComponentVisible, exceptionRef } = useComponentVisible(false);

    return (
        <div className="dropdown">
            <div
                role={'button'}
                className="dropdown-header"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <img
                    alt="Menu"
                    ref={exceptionRef as React.LegacyRef<HTMLImageElement>}
                    className=""
                    src={isComponentVisible ? "/image/icons/icon_close.svg": "/image/icons/icon_menu.svg"}
                />
            </div>
            <div
                className={`dropdown-body ${isComponentVisible && 'open'} w-[248px]`}
                ref={ref as React.LegacyRef<HTMLDivElement>}
            >
                {MENU_BAR_ITEMS.map((item, index) => (
                    <Fragment key={item.path}>
                        {index !== 0 ? <hr className={'border'} /> : null}
                        <Link to={item.path[0] === '#' ? item.path : '#'} className="block link dropdown-item">
                            {item.name}
                        </Link>
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default Dropdown;