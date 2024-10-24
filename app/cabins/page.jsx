"use client";

import { useState } from "react";

export default function Page() {
   const [count, setCount] = useState(0);

   return (
      <div>
         <h1>Cabins Page</h1>
         {count}
         <button onClick={() => setCount((value) => value + 1)}>Increase</button>
      </div>
   );
}
