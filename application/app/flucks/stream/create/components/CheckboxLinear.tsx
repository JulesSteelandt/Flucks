import React, { useState } from 'react';

const Switcher1 = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <label className='flex cursor-pointer select-none items-center'>
            <div className='relative'>
                <input
                    type='checkbox'
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className='sr-only'
                />
                <div className={` block h-8 w-14 rounded-full ${isChecked ? 'bg-[#10B981]' : 'bg-[#BFC1C6]'}`}></div>
                <div className={`drop-shadow-lg dot absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition ${isChecked ? 'transform translate-x-6' : ''}`}></div>
            </div>
        </label>
    );
};

export default Switcher1;
