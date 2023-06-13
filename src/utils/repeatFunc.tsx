export default function Repeat(props: any) {
  let items = []
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i))
  }
  return <>{items}</>
}
