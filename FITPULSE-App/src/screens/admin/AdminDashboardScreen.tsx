import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { getAdminDashboard } from '../../api/adminApi';

export default function AdminDashboardScreen() {

  const [loading,setLoading]=useState(true);
  const [dashboard,setDashboard]=useState<any>(null);

  useEffect(()=>{
    load();
  },[]);

  const load=async()=>{
    const data=await getAdminDashboard();
    setDashboard(data);
    setLoading(false);
  };

  if(loading){
    return(
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#22D3EE"/>
      </View>
    );
  }

  const stats=[
    {
      label:'Users',
      value:dashboard.totalUsers,
      color:'#22D3EE',
      icon:'people'
    },
    {
      label:'Workouts',
      value:dashboard.totalActivities,
      color:'#C084FC',
      icon:'barbell'
    },
    {
      label:'Calories',
      value:dashboard.totalCalories,
      color:'#FB7185',
      icon:'flame'
    },
    {
      label:'Minutes',
      value:dashboard.totalMinutes,
      color:'#4ADE80',
      icon:'time'
    }
  ];

  return(
    <View style={styles.container}>

      <ScrollView>

        <LinearGradient
          colors={['#7C3AED','#312E81']}
          style={styles.hero}
        >
          <Text style={styles.small}>
            Enterprise Panel
          </Text>

          <Text style={styles.title}>
            Admin Analytics
          </Text>

          <Text style={styles.sub}>
            Live MySQL Insights
          </Text>
        </LinearGradient>

        <View style={styles.body}>

          <View style={styles.grid}>

            {stats.map(item=>(
              <View key={item.label} style={styles.card}>

                <Ionicons
                  name={item.icon as any}
                  size={26}
                  color={item.color}
                />

                <Text style={styles.value}>
                  {item.value}
                </Text>

                <Text style={styles.label}>
                  {item.label}
                </Text>

              </View>
            ))}

          </View>

          <View style={styles.chartCard}>

            <Text style={styles.chartTitle}>
              Weekly Activity
            </Text>

            <View style={styles.chart}>

              {dashboard.weeklyActivity.map(
                (v:number,i:number)=>(
                  <View key={i} style={styles.barWrap}>
                    <View
                      style={[
                        styles.bar,
                        {height:v}
                      ]}
                    />

                    <Text style={styles.day}>
                      {
                        ['M','T','W','T','F','S','S'][i]
                      }
                    </Text>
                  </View>
                )
              )}

            </View>

          </View>

        </View>

      </ScrollView>

    </View>
  );
}

const styles=StyleSheet.create({

container:{
flex:1,
backgroundColor:'#070B16'
},

loader:{
flex:1,
justifyContent:'center',
alignItems:'center',
backgroundColor:'#070B16'
},

hero:{
paddingTop:70,
padding:22,
borderBottomLeftRadius:28,
borderBottomRightRadius:28
},

small:{
color:'#DDD6FE'
},

title:{
color:'#fff',
fontSize:30,
fontWeight:'800',
marginTop:8
},

sub:{
color:'#C4B5FD',
marginTop:6
},

body:{
padding:18
},

grid:{
flexDirection:'row',
flexWrap:'wrap',
justifyContent:'space-between'
},

card:{
width:'48%',
backgroundColor:'#111827',
borderRadius:22,
padding:18,
marginBottom:16
},

value:{
color:'#fff',
fontSize:26,
fontWeight:'800',
marginTop:10
},

label:{
color:'#94A3B8',
marginTop:4
},

chartCard:{
backgroundColor:'#111827',
borderRadius:22,
padding:18
},

chartTitle:{
color:'#fff',
fontSize:18,
fontWeight:'700',
marginBottom:18
},

chart:{
height:150,
flexDirection:'row',
justifyContent:'space-between',
alignItems:'flex-end'
},

barWrap:{
alignItems:'center'
},

bar:{
width:18,
backgroundColor:'#22D3EE',
borderRadius:10
},

day:{
color:'#64748B',
marginTop:8
}

});