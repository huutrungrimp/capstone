import { useState, useEffect } from "react";
import axios from "axios";



export const ConfirmMapData = () => {
  const [confirm, setConfirm] = useState({});
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/covid19/maps/confirm`).then((res) => {
      const item = res.data;
      setConfirm(item);
    });
  }, []);
  console.log(confirm);

  return confirm;
};

export const DeathMapData = () => {
    const [death, setDeath] = useState({});
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/covid19/maps/death`).then((res) => {
      const item = res.data;
      setDeath(item);
    });
  }, []);
  console.log(death);
  
  return death;
};

export const RecoveryMapData = () => {
    const [recovery, setRecovery] = useState({});
    useEffect(() => {
      axios.get(`http://127.0.0.1:8000/covid19/maps/recovery`).then((res) => {
        const item = res.data;
        setRecovery(item);
      });
    }, []);
    console.log(recovery);
    
    return recovery;
};


export const VacinationMapData = () => {
  const [vacination, setVacination] = useState({});
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/covid19/vacinationMap`).then((res) => {
      const item = res.data;
      setVacination(item);
    });
  }, []);
  console.log(vacination);
  
  return vacination;
};



export const Stats = () => {
  const [stats, setStats] = useState({});
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/covid19/stats`).then((res) => {
      const item = res.data;
      setStats(item);
    });
  }, []);
  console.log(stats);
  
  return stats;
};


