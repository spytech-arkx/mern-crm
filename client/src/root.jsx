import Navbar from "./components/shared/Navbar";
import Sidebar from "./components/shared/Sidebar";
import Footer from "./components/shared/Footer";
import "./styles/index.css";

import { Grid, GridItem } from "@chakra-ui/react";

import { useState } from "react";
import { Outlet } from "react-router-dom/dist";

export default function Root() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Grid
        templateAreas={`"nav header"
          "nav main"
          "nav footer"`}
        gridTemplateRows={"100px auto 60px"}
        gridTemplateColumns={isSidebarOpen ? "250px 1fr" : "60px 1fr"}
        color="blackAlpha.700">
        <GridItem
          pos="relative"
          w="100%"
          mt={1}
          area={"header"}>
          <Navbar />
        </GridItem>
        <GridItem position="fixed" area={"nav"}>
          <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        </GridItem>
        <GridItem area={"main"}>
          <Outlet />
        </GridItem>
        <GridItem area={"footer"}>
          <Footer />
        </GridItem>
      </Grid>
    </div>
  );
}
