import React from 'react'

const Permissoin = ({value,handleChange}) => {
  return (
    <div className="space-y-2 ">
            <label className="w-full" htmlFor="Permission">
              Permission
            </label>
            <select
              className="focus:border-orange-500 w-full col-span-3 focus:!border-b-2 outline-none border-b border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2 "
              id={"Permission"}
              placeholder={`Enter Permission Here`}
              value={value}
              name="permission"
              onChange={handleChange}
            >
              <option hidden value="Choose">
                Choose
              </option>
              <option value="early">Early Out</option>
              <option value="late">Late In</option>
              <option value="none">None</option>
            </select>
          </div>
  )
}

export default React.memo(Permissoin)