import React from 'react'

const DayType = ({value,handleChange}) => {
  return (
    <div className="space-y-2 ">
            <label className="w-full" htmlFor="Day Type">
              Day Type
            </label>
            <select
              className="focus:border-orange-500 w-full col-span-3 focus:!border-b-2 outline-none border-b border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2 "
              id={"Day Type"}
              placeholder={`Enter Day Type Here`}
              value={value}
              name="dayType"
              onChange={handleChange}
            >
              <option hidden value="Choose">
                Choose
              </option>
              <option value="w">W</option>
              <option value="H">H</option>
              <option value="M">M</option>
              <option value="P">P</option>
              <option value="A">A</option>
              <option value="R">R</option>
              <option value="PH">PH</option>
              <option value="WH">WH</option>
              <option value="none">None</option>
            </select>
          </div>
  )
}

export default React.memo(DayType)