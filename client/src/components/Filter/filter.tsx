import { useSearchParams } from "react-router-dom";

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsObj = Object.fromEntries(searchParams.entries());

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchParams.get("search") || ""}
        onChange={(e) =>
          setSearchParams({
            ...paramsObj,
            search: e.target.value,
          })
        }
      />
      <select
        value={searchParams.get("role") || ""}
        onChange={(e) =>
          setSearchParams({
            ...paramsObj,
            role: e.target.value,
          })
        }
      >
        <option value="all">All</option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
};

export default Filter;
