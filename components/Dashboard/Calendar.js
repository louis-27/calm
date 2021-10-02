import { Flex, Text } from "@chakra-ui/react";
import { Calendar } from "antd";

const DashboardNotesRow = ({ entry, time }) => {
  return (
    <>
      <div className="antd-calendar-card">
        <Calendar
          fullscreen={false}
          onPanelChange={() => console.log("test")}
        />
      </div>
      <style jsx>{`
        .antd-calendar-card {
          width: 100%;
          border: 1px solid #f0f0f0;
          border-radius: 2px;
        }
      `}</style>
    </>
  );
};

export default DashboardNotesRow;
