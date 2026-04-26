export async function PostList() {
  await new Promise((resolve, reject) => setTimeout(()=>{resolve(22)}, 10000));
  return (
    <p>this is post list</p>
  )
}