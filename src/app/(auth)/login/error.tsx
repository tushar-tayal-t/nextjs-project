"use client";

const Error = ({error, reset}: {error: any, reset: () => void}) => {
  return (
    <div>
      some error has occuret
      <p><button onClick={() => reset()}>Try again</button></p>
    </div>
  )
}

export default Error
