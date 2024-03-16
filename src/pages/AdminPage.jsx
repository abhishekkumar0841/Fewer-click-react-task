import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import Card from "../Components/Card";
import { setFilteredData, setInitialData } from "../redux/slices/fetchedData";
import ReactPaginate from "react-paginate";
import { setAlbumId, setIdSequence } from "../redux/slices/evenOddPrime";
import SideBar from "../Components/SideBar";
import AdminPageHeader from "../Components/AdminPageHeader";
import Spinner from "../Components/Spinner/Spinner";

const url = "https://jsonplaceholder.typicode.com/photos";

const AdminPage = () => {
  const data = useSelector((state) => state?.apiData?.initialData);
  const filterData = useSelector((state) => state?.apiData?.filteredData);
  const idSeq = useSelector((state) => state?.idSequence?.idSequence);
  const albumId = useSelector((state) => state?.idSequence?.albumId);

  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 8;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const paginationMessage = `Showing ${itemOffset + 1} to ${endOffset} of ${
    filterData?.length
  }`;
  const currentItems = filterData?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filterData?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filterData.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(url);
      const data = res?.data?.map((el) => ({
        ...el,
        email: el?.title.split(" ")[0] + "@gmail.com",
      }));
      dispatch(setInitialData(data));
    } catch (error) {
      console.log("ERROR WHILE FETCHING DATA:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search) {
      const filteredData = data.filter((el) =>
        String(el?.title)?.toLowerCase()?.includes(search?.toLowerCase())
      );
      dispatch(setFilteredData(filteredData));
    } else if (albumId) {
      const filteredAlbum = data.filter((el) =>
        String(el?.albumId)?.includes(albumId)
      );
      dispatch(setFilteredData(filteredAlbum));
    } else {
      dispatch(setFilteredData(data));
    }
  }, [search, data, albumId]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className=" bg-[#196c6c] min-h-[100vh] w-full p-5 flex ">
      {/* sidebar */}
      <div className=" lg:w-2/12 w-0">
        <SideBar />
      </div>

      {/* main content */}
      <div className=" bg-white w-full lg:w-10/12 rounded-2xl p-5">
        <AdminPageHeader />
        <div className=" w-full bg-gray-500 h-[1px] mt-5 mb-5"></div>

        {/* filters bar */}
        <div className="lg:flex items-center justify-between">
          <div className="flex items-center border flex-1 px-5 py-2 sm:mr-20 rounded-lg">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className=" outline-none border-none w-full"
            />
            <CiSearch className=" font-bold cursor-pointer text-2xl" />
          </div>
          <div className="flex-col sm:flex-row flex sm:items-center gap-5 mt-2 lg:mt-0">
            <select
              value={albumId}
              onChange={(e) => dispatch(setAlbumId(e.target.value))}
              className=" cursor-pointer border px-5 py-2 font-semibold rounded-lg bg-[#f5f4ff] outline-none"
            >
              <option value="" disabled>
                Album
              </option>
              {Array(100)
                .fill("")
                .map((el, idx) => (
                  <option key={idx} value={idx + 1}>
                    Album {idx + 1}
                  </option>
                ))}
            </select>
            <select
              className=" cursor-pointer border px-5 py-2 font-semibold rounded-lg bg-[#f5f4ff] outline-none"
              value={idSeq}
              onChange={(e) => dispatch(setIdSequence(e.target.value))}
            >
              <option value="" disabled>
                Select Odd
              </option>
              <option value="Even">Even</option>
              <option value="Odd">Odd</option>
              <option value="Prime">Prime</option>
            </select>
            <button className=" bg-[#196c6c] px-5 py-2 rounded-lg text-white">
              Add Photo
            </button>
          </div>
        </div>

        {/* cards */}
        <div className="cardsConatiner flex flex-wrap gap-10 mt-4 items-center justify-center">
          {loading ? (
            <Spinner />
          ) : currentItems?.length ? (
            currentItems.map((userData) => (
              <Card key={userData?.id} userData={userData} />
            ))
          ) : (
            <div className="flex items-center justify-center h-full w-full">
              No Data
            </div>
          )}
        </div>
        {currentItems?.length ? (
          <div className="md:flex md:justify-between grid place-items-center gap-1 mt-5">
            {paginationMessage}
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel="<"
              renderOnZeroPageCount={null}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AdminPage;
