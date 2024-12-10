'use client';

import { useThreeStore } from '@/features/three/store/useThree';
import { MainBurgerIcon, MenuBurgerIcon } from '@/design-system/atoms';

interface MenuTogglerProps extends React.HTMLAttributes<HTMLElement> {
  mainMenu?: boolean;
  onAditionalClick?: () => void;
}

function MenuToggler({ mainMenu, onAditionalClick }: MenuTogglerProps) {
  const setIsMenuOpen = useThreeStore(state => state.setIsMenuOpen);
  const isMenuOpen = useThreeStore(state => state.isMenuOpen);

  const AbsoluteClass = mainMenu && 'absolute top-4 left-1/2 -translate-x-1/2';
  const BlurBdClass =
    mainMenu &&
    'bg-[rgba(145, 145, 145, 0.65)] shadow-md shadow-[rgba(31,31,31,0.2)] backdrop-blur-[4px] h-10 w-202 rounded-3xl';
  const TextColorClass = mainMenu ? 'text-[#f5f5f5] 1sm:text-[#131313]' : 'text-[#f5f5f5]';
  const DisplayClass = mainMenu && isMenuOpen ? 'hidden' : 'flex';

  const _renderBurgerIcon = () => {
    return mainMenu ? <MainBurgerIcon /> : <MenuBurgerIcon />;
  };

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);

    onAditionalClick && onAditionalClick();
  };

  return (
    <div
      onClick={handleClick}
      className={`${AbsoluteClass} ${BlurBdClass} ${DisplayClass} group cursor-pointer items-center justify-center overflow-hidden p-[2px]`}>
      <div className='relative flex h-full w-full items-center justify-between gap-4 px-4'>
        <div className='flex items-center justify-between'>
          <h4
            className={`${TextColorClass} m-0 p-0 font-josefin font-semibold opacity-65 duration-300 group-hover:opacity-100 group-hover:[transform:rotateX(360deg)]`}>
            M
          </h4>
          <h4
            className={`${TextColorClass} m-0 p-0 font-josefin font-semibold opacity-65 delay-75 duration-300 group-hover:opacity-100 group-hover:[transform:rotateX(360deg)]`}>
            E
          </h4>
          <h4
            className={`${TextColorClass} m-0 p-0 font-josefin font-semibold opacity-65 delay-125 duration-300 group-hover:opacity-100 group-hover:[transform:rotateX(360deg)]`}>
            N
          </h4>
          <h4
            className={`${TextColorClass} m-0 p-0 font-josefin font-semibold opacity-65 delay-175 duration-300 group-hover:opacity-100 group-hover:[transform:rotateX(360deg)]`}>
            U
          </h4>
        </div>
        {_renderBurgerIcon()}
      </div>
    </div>
  );
}

export default MenuToggler;
