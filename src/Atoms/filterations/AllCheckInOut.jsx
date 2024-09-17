import React from 'react'

const AllCheckInOut = ({value,handleChange}) => {
  return (
    <div className="space-y-2 ">
            <label className="w-full" htmlFor="CheckIn/Out">
              CheckIn/Out
            </label>
            <select
              className="focus:border-orange-500 w-full col-span-3 focus:!border-b-2 outline-none border-b border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2"
              id={"CheckIn/Out"}
              placeholder={`Enter CheckIn/Out Type Here`}
              value={value}
              name="checkType"
              onChange={handleChange}
            >
              <option hidden value="Choose">
                Choose
              </option>
              <option value="">All</option>
              <option value="No CheckIn">No CheckIn</option>
              <option value="No CheckOut">No CheckOut</option>
              <option value="No CheckIn/Out">No CheckIn/Out</option>
              <option value="CheckIn & CheckOut">CheckIn & CheckOut</option>
              <option value="none">None</option>
            </select>
          </div>
  )
}

export default React.memo(AllCheckInOut)