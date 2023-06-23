import HotelList from "../components/HotelList";

const Dashboard = () => {
  return (
    <div className="mt-8 px-6">
      <h1 className="text-4xl font-bold mb-4">Hello!</h1>
      <HotelList
        hotels={[
          {
            name: "Hotel 1",
            location: "Location 1",
            imageLink:
              "https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=612x612&w=0&k=20&c=cODMSPbYyrn1FHake1xYz9M8r15iOfGz9Aosy9Db7mI=",
          },
        ]}
      />
    </div>
  );
};

export default Dashboard;
