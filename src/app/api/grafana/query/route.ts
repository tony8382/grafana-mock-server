export async function POST(request: Request) {
  let res = [
    {
      "target":1, // The field being queried for
      "datapoints":[
        [622,1450754160000],  // Metric value as a float , unixtimestamp in milliseconds
        [365,1450754220000]
      ]
    },
    {
      "target":2,
      "datapoints":[
        [861,1450754160000],
        [767,1450754220000]
      ]
    }
  ]
  return new Response( JSON.stringify(res) )
}
