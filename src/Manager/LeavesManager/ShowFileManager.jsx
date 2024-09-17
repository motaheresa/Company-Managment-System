import React from 'react'

const ShowFile = ({oneData}) => {
  return (
    <div>
        <iframe
          title="PDF Viewer"
          src={`${oneData.fileSick}`}
          width="100%"
          height="500px"
          style={{ border: 'none' }}
        />
    </div>
  )
}

export default ShowFile