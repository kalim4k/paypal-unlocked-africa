

# Remplacement de Maketou par Money Fusion

## Objectif
Remplacer le processeur de paiement Maketou par Money Fusion dans tout le flux d'achat, en utilisant l'API Money Fusion fournie.

## Ce qui change

### 1. Nouveau secret : MONEYFUSION_API_URL
L'API Money Fusion utilise une URL unique par application (votre lien API depuis le tableau de bord). Il faudra stocker cette URL comme secret backend. D'apres le lien fourni, l'URL API est : `https://www.pay.moneyfusion.net/Paypal_Ebook/065780bddff168be/pay/`

### 2. Réécriture de la fonction `create-checkout`
- Remplacer l'appel à l'API Maketou par un appel POST à l'API Money Fusion
- Nouveau format de payload :
  - `totalPrice` : 2500 (FCFA)
  - `article` : description de l'achat
  - `numeroSend` : numéro de téléphone du client
  - `nomclient` : nom du client
  - `return_url` : URL de callback (la fonction `payment-callback`)
- La réponse contient un champ `url` vers lequel rediriger l'utilisateur

### 3. Mise à jour de la fonction `payment-callback`
- Money Fusion redirige l'utilisateur vers le `return_url` avec un parametre `token` dans l'URL
- La fonction extraira ce token et pourra optionnellement verifier le statut du paiement via `https://www.pay.moneyfusion.net/paiementNotif/{token}`
- Puis redirigera vers `/success`

### 4. Mise à jour de la page Confirm
- Adapter les champs envoyés : `nomclient` et `numeroSend` au lieu de `email`, `firstName`, `lastName`
- Le champ retourné sera `url` (au lieu de `redirectUrl`)

## Details techniques

### Fonction `create-checkout` (réécriture)
```
POST vers MONEYFUSION_API_URL avec :
{
  totalPrice: 2500,
  article: [{ "Abonnement": 2500 }],
  personal_Info: [{ orderId: "paypal-ebook" }],
  numeroSend: phone,
  nomclient: name,
  return_url: "https://{projectId}.supabase.co/functions/v1/payment-callback"
}

Reponse attendue : { statut, token, message, url }
Retourner { redirectUrl: data.url, token: data.token }
```

### Fonction `payment-callback` (mise a jour)
- Extraire le `token` des parametres URL
- Verifier le statut via GET `https://www.pay.moneyfusion.net/paiementNotif/{token}`
- Si `paid` : rediriger vers `/success`
- Sinon : rediriger vers `/confirm` avec un message d'erreur

### Page `Confirm.tsx`
- Changer les champs du body : `name` et `phone` au lieu de `email`, `firstName`, `lastName`
- Adapter la lecture de la reponse : `data?.url` ou `data?.redirectUrl`

### Secret a ajouter
- `MONEYFUSION_API_URL` avec la valeur `https://www.pay.moneyfusion.net/Paypal_Ebook/065780bddff168be/pay/`

