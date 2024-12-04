import { Button, LogBox, Text, View } from "react-native";
import { useRouter } from 'expo-router';
import logo from "/workspaces/Stardew-valley-market/my-app/assets/images/logoSW.png";

export default function TrocaTela() {
  const router = useRouter();
  const TrocaTela = async () => {
    var contagem = 1
      if (contagem == 1) {
        router.push('/vendas');
      } else {
        setErrorMessage('Teste');
      }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <img src="/workspaces/Stardew-valley-market/my-app/assets/images/logoSW.png"></img>
        <h1>Seja bem-vindo ao mercado oficial do Stardew Valley</h1>
      </div>
      <Button title="Entrar" onPress={TrocaTela}> </Button>
    </View>
  );
}
