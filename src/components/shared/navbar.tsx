"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    if(searchParams.get("platform")){
      router.push(`/?q=${query}&platform=${searchParams.get("platform")}`);
    }
    else{
      router.push(`/?q=${query}`);
    }
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filter = e.target.value;
    if(searchParams.get("q")){
      router.push(`/?q=${searchParams.get("q")}&platform=${filter}`);
    }
    else{
      router.push(`/?platform=${filter}`);
    }
  }
  return (
    <nav className="max-w-7xl h-10 mx-auto mt-10 mb-4 flex justify-between items-center gap-4">
      <div className="w-full h-full">
        <input
          type="text"
          placeholder="search contests..."
          onChange={handleChange}
          onInput={handleChange}
          className=" w-full h-full px-2 bg-background text-lg focus-within:outline-none font-inter rounded-border"
        />
      </div>
      <div className="w-auto h-full">
        <select onChange={handleFilter} className="bg-background h-full rounded-border px-2 focus-within:outline-none" name="" id="">
          <option className="cursor-pointer bg-background border-border" value="all">All</option>
          <option className="cursor-pointer bg-background border-border" value="leetcode">Leetcode</option>
          <option className="cursor-pointer bg-background border-border" value="atcoder">Atcoder</option>
          <option className="cursor-pointer bg-background border-border" value="codeforces">Codeforces</option>
        </select>
      </div>
    </nav>
  );
}
