import {useState, useCallback} from "react"
import { Alert, FlatList } from "react-native";
import {useNavigation, useFocusEffect} from "@react-navigation/native"


import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";


import {Container} from "./styles"
import { groupsGetAll } from "@storage/group/groupsGetAll";

type RootParamList = {
  groups: undefined
  new: undefined
  players: {
    group: string;
  }
}

export function Groups() {

  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation()

  function handleNewGroup(){
     navigation.navigate('new')
  }

  async function fetchGroups(){
    try{
     const data = await groupsGetAll()
     setGroups(data)
    }catch(error){
      console.log(error)
      Alert.alert('Turmas', 'Não foi possivel carregas as turmas')
    }
  }

  function handleOpenGroup(group: string){
    navigation.navigate('players', {group})
  }

  useFocusEffect(useCallback(() => {
    fetchGroups()
  },[]))

  
  return (
    <Container>
      <Header/>
      <Highlight
        title="Turmas"
        subtitle="Jogue com a sua turma"
      />
      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <GroupCard 
            title={item} 
            onPress={() => handleOpenGroup(item)}
          />
        )}
        contentContainerStyle={groups.length === 0 && {flex: 1}}
        ListEmptyComponent={() => (
          <ListEmpty 
            message="Que tal cadastrar a primeira turma?"
          
          />
        )}
        showsVerticalScrollIndicator={false}
      />

      <Button
        title="Criar nova turma"
        onPress={handleNewGroup}
       
      />
     
    </Container>
  );
}


