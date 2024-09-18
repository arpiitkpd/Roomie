import React, {useId} from 'react'

const Input = React.forwardRef(
    function Input({
        label, type="", className="", className2="block text-xs font-semibold text-gray-600 uppercase",...props
    } , ref){
        const id = useId();
        return(
            <div className=''>
                {label &&(
                    <label htmlFor={id}
                    className={`${className2} `}>
                        {label}
                    </label>
                )}
                <input 
                  className={` ${className} text-black mt-1 `}
                  type={type}
                ref={ref}
                {...props}
                id={id}
                />
                
            </div>
        )
    }
)



export default Input