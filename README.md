# FocusApp

React Native ve Expo ile geliştirilmiş, odaklanma seanslarını ve verimliliği takip eden basit bir mobil uygulama.

## Açıklama

FocusApp, kullanıcıların çalışma veya ders çalışma seansları sırasında odaklanma sürelerini ve dikkat dağınıklıklarını izlemelerine yardımcı olur. Zamanlayıcı, kategori seçimi, grafiklerle veri görselleştirme ve geçmiş seansların geçmişi gibi özellikler içerir. Tüm veriler cihazda yerel olarak saklanır.

## Özellikler

- **Zamanlayıcı**: Özelleştirilebilir odaklanma seansları (15, 25, 45, 60 dakika veya özel)
- **Kategoriler**: Ön tanımlı kategoriler (Study, Coding, Reading) ve özel kategori ekleme seçeneği
- **Dikkat Dağınıklığı Takibi**: Aktif seanslar sırasında dikkat dağınıklığı sayısını sayma
- **Raporlar**: Çubuk ve pasta grafikleri ile günlük/haftalık trendler ve kategori dağılımı istatistikleri
- **Geçmiş**: Geçmiş seansları tarih bazlı gözden geçirme
- **Yerel Saklama**: Tüm veriler AsyncStorage kullanarak yerel olarak saklanır

## Kullanılan Teknolojiler

- **React Native** (Expo ile)
- **React Navigation** (Bottom Tabs)
- **AsyncStorage** yerel veri kalıcılığı için
- **react-native-chart-kit** grafikler için
- **expo-haptics** dokunsal geri bildirim için

## Kurulum

1. **Depoyu klonlayın**:
   ```
   git clone https://github.com/k2dir/FocusApp.git
   cd FocusApp
   ```

2. **Bağımlılıkları yükleyin**:
   ```
   npm install
   ```

3. **Geliştirme sunucusunu başlatın**:
   ```
   npx expo start
   ```

4. **Cihazda/emülatörde çalıştırın**:
   - Android için: `npx expo start --android`
   - iOS için: `npx expo start --ios`
   - Web için: `npx expo start --web`

## Kullanım

1. **Ana Ekran**: Kategori seçin, zamanlayıcı süresini belirleyin, odaklanma seansını başlatın.
2. **Dikkat Dağınıklıklarını Takip Edin**: Aktif seanslar sırasında dikkat dağınıklığı butonuna dokunun.
3. **Raporlar Ekranı**: Günlük/toplam istatistikleri ve grafikleri görüntüleyin. Örnek veri eklemek için ekleme butonunu kullanın.
4. **Geçmiş Ekranı**: Geçmiş seansları tarih bazlı inceleyin.

## Proje Yapısı

```
FocusApp/
├── App.js
├── app.json
├── index.js
├── package.json
├── assets/
└── src/
    ├── components/
    │   ├── AppButton.js
    │   └── Card.js
    ├── hooks/
    │   ├── useHistoryLogic.js
    │   ├── useHomeLogic.js
    │   └── useReportsLogic.js
    ├── navigation/
    │   └── AppNavigator.js
    ├── screens/
    │   ├── HistoryScreen.js
    │   ├── HomeScreen.js
    │   └── ReportsScreen.js
    ├── services/
    │   └── storage.js
    └── styles/
        ├── colors.js
        ├── homeStyles.js
        └── reportsStyles.js
```

## Katkıda Bulunma

Depoyu forklayın ve iyileştirmeler veya hata düzeltmeleri için pull request gönderebilirsiniz
