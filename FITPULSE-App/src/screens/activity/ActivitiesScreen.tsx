import { useMemo, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { getActivities } from '../../api/activityApi';

const filters = ['ALL','GYM','RUNNING','YOGA','CYCLING'];

export default function ActivitiesScreen({ navigation }: any) {

  const [activities,setActivities]=useState<any[]>([]);
  const [refreshing,setRefreshing]=useState(false);

  const [search,setSearch]=useState('');
  const [selected,setSelected]=useState('ALL');

  const load = async ()=>{
    const data = await getActivities();
    setActivities(data);
  };

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  const onRefresh = async ()=>{
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const filtered = useMemo(()=>{

    return activities.filter(a=>{

      const type = a.type.toUpperCase();

      const matchType =
        selected==='ALL' || type===selected;

      const matchSearch =
        type.includes(search.toUpperCase());

      return matchType && matchSearch;
    });

  },[activities,selected,search]);

  const totalCalories = filtered.reduce(
    (s,i)=> s+i.calories,0
  );

  const totalMinutes = filtered.reduce(
    (s,i)=> s+i.duration,0
  );

  return(
    <View style={styles.container}>

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fff"
          />
        }
      >

        <LinearGradient
          colors={['#7C3AED','#5B21B6','#1E1B4B']}
          style={styles.hero}
        >
          <Text style={styles.small}>
            Workout Intelligence
          </Text>

          <Text style={styles.title}>
            My Activities
          </Text>

          <View style={styles.summaryRow}>

            <View>
              <Text style={styles.value}>
                {totalMinutes}
              </Text>
              <Text style={styles.label}>Minutes</Text>
            </View>

            <View>
              <Text style={styles.value}>
                {totalCalories}
              </Text>
              <Text style={styles.label}>Calories</Text>
            </View>

            <View>
              <Text style={styles.value}>
                {filtered.length}
              </Text>
              <Text style={styles.label}>Sessions</Text>
            </View>

          </View>

        </LinearGradient>

        <View style={styles.content}>

          <View style={styles.searchBox}>
            <Ionicons
              name="search"
              size={20}
              color="#64748B"
            />

            <TextInput
              placeholder="Search workout..."
              placeholderTextColor="#64748B"
              value={search}
              onChangeText={setSearch}
              style={styles.input}
            />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {filters.map(item=>(
              <TouchableOpacity
                key={item}
                onPress={()=>setSelected(item)}
                style={[
                  styles.chip,
                  selected===item && styles.activeChip
                ]}
              >
                <Text style={[
                  styles.chipText,
                  selected===item && styles.activeText
                ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {filtered.map(item=>(
            <View key={item.id} style={styles.card}>

              <View style={styles.iconCircle}>
                <Ionicons
                  name={
                    item.type==='RUNNING'
                    ?'walk'
                    :item.type==='YOGA'
                    ?'leaf'
                    :item.type==='CYCLING'
                    ?'bicycle'
                    :'barbell'
                  }
                  color="#22D3EE"
                  size={24}
                />
              </View>

              <View style={{flex:1}}>
                <Text style={styles.type}>
                  {item.type}
                </Text>

                <Text style={styles.date}>
                  {item.activityDate}
                </Text>
              </View>

              <View style={{alignItems:'flex-end'}}>
                <Text style={styles.cal}>
                  {item.calories} kcal
                </Text>

                <Text style={styles.min}>
                  {item.duration} min
                </Text>
              </View>

            </View>
          ))}

          <View style={{height:120}}/>

        </View>

      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={()=>
          navigation.navigate('AddActivity')
        }
      >
        <Ionicons
          name="add"
          size={32}
          color="#fff"
        />
      </TouchableOpacity>

    </View>
  );
}

const styles=StyleSheet.create({

container:{
flex:1,
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

summaryRow:{
flexDirection:'row',
justifyContent:'space-between',
marginTop:28
},

value:{
color:'#fff',
fontSize:28,
fontWeight:'800'
},

label:{
color:'#C4B5FD',
marginTop:4
},

content:{
padding:18
},

searchBox:{
backgroundColor:'#111827',
borderRadius:18,
flexDirection:'row',
alignItems:'center',
paddingHorizontal:14,
height:56,
marginBottom:18
},

input:{
flex:1,
color:'#fff',
marginLeft:10
},

chip:{
paddingHorizontal:18,
paddingVertical:10,
backgroundColor:'#111827',
borderRadius:30,
marginRight:10,
marginBottom:18
},

activeChip:{
backgroundColor:'#22D3EE'
},

chipText:{
color:'#94A3B8',
fontWeight:'600'
},

activeText:{
color:'#000'
},

card:{
backgroundColor:'#111827',
borderRadius:22,
padding:16,
flexDirection:'row',
alignItems:'center',
marginBottom:14
},

iconCircle:{
width:54,
height:54,
borderRadius:27,
backgroundColor:'#0F172A',
justifyContent:'center',
alignItems:'center',
marginRight:14
},

type:{
color:'#fff',
fontSize:18,
fontWeight:'700'
},

date:{
color:'#64748B',
marginTop:4
},

cal:{
color:'#F472B6',
fontWeight:'700'
},

min:{
color:'#22D3EE',
marginTop:4
},

fab:{
position:'absolute',
right:22,
bottom:92,
width:64,
height:64,
borderRadius:32,
backgroundColor:'#7C3AED',
justifyContent:'center',
alignItems:'center',
elevation:10
}

});