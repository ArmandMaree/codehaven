import React from "react";
import { Table } from "react-bootstrap";
import EditScheduleModal from "../../components/aquarium-manager/editScheduleModal";
import AddScheduleModal from "../../components/aquarium-manager/addScheduleModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import cronstrue from "cronstrue";

class FeederSchedules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scheduleList: [],
    };

    this.getScheduleList = this.getScheduleList.bind(this);
    this.tick = this.tick.bind(this);
    this.getSchedules = this.getSchedules.bind(this);
  }

  componentDidMount() {
    document.title = "Schedules - Feeders - CodeHaven";
    this.tick();
    this.timerID = setInterval(() => this.tick(), 30000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    const thisFeederSchedules = this;

    this.getSchedules().then((schedules) => {
      thisFeederSchedules.schedules = schedules;

      thisFeederSchedules.setState({
        scheduleList: thisFeederSchedules.getScheduleList(
          thisFeederSchedules.schedules
        ),
      });
    });
  }

  getSchedules() {
    const requestOptions = {
      method: "GET",
    };

    return fetch(`/api/aquarium-manager/schedules`, requestOptions)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .catch((error) => {
        toast.error(
          "Hmmm. Something went wrong while retrieving schedules. Please try again later.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );

        toast.error(`Error message: ${error.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  }

  getScheduleList(schedules) {
    return schedules.map((schedule) => {
      const modal = (
        <EditScheduleModal
          scheduleId={schedule.id}
          refreshCallback={this.tick}
        />
      );

      return (
        <tr key={schedule.id}>
          <td>{schedule.id}</td>
          <td>{schedule.Feeder.name}</td>
          <td>{cronstrue.toString(schedule.cron)}</td>
          <td>{modal}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <>
        <ToastContainer />

        <h1>Feeder Schedules</h1>
        <br />
        <AddScheduleModal refreshCallback={this.tick} />
        <br />
        <br />
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Feeder</th>
              <th>Schedule (Cron)</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.state.scheduleList}</tbody>
        </Table>
      </>
    );
  }
}

export default FeederSchedules;
