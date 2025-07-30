import { View, Image } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Payment } from "../../shared/domain/payment.types";
import { Typography } from "@/src/shared/view/ui-kit/components/Typography/Typography";

type Props = {
  logoUrl: Payment["logo_url"];
  merchantName: Payment["merchant_display_name"];
};

const MERCHANT_LOGO_SIZE = 36;

export const MerchantLogo = ({ logoUrl, merchantName }: Props) => {
  if (logoUrl) {
    return (
      <View style={[styles.container, styles.imageContainer]}>
        <Image
          source={{ uri: logoUrl }}
          style={styles.image}
          resizeMode="cover"
          testID="merchant-logo-image"
        />
      </View>
    );
  }
  const firstLetter = merchantName.charAt(0).toUpperCase() || "?";

  return (
    <View style={[styles.container, styles.letterContainer]}>
      <Typography variant="Title.H3" color="colors.neutral.white">
        {firstLetter}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    width: MERCHANT_LOGO_SIZE,
    height: MERCHANT_LOGO_SIZE,
    borderRadius: MERCHANT_LOGO_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  imageContainer: {
    backgroundColor: theme.colors.neutral.lowest,
  },
  letterContainer: {
    backgroundColor: theme.colors.primary.highest,
  },
  image: {
    width: MERCHANT_LOGO_SIZE,
    height: MERCHANT_LOGO_SIZE,
  },
}));
