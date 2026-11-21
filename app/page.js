import Image from "next/image";
import mockSportsee from "./data/mockSportsee.json";
import styles from "./page.module.css";

export default function Home() {
  
  const {userActivity} = mockSportsee;
  const averageHeartRate = userActivity[0].heartRate.average; 
  const heartRateData = userActivity.map((session) => ({
    date: session.date,
    heartAverageRate: session.heartRate.average,
    heartRateMax: session.heartRate.max,
    heartRateMin: session.heartRate.min,
  }));

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        
        <div className={styles.intro}>
          <h1>
            Bienvenue dans le projet sportsee
          </h1>
             <p>Fréquence cardiaque moyenne : {averageHeartRate} bpm<pre>{JSON.stringify(heartRateData, null, 2)}</pre></p>
        </div>
      </main>
    </div>
  );
}
