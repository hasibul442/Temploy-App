import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

function CardWithCircleProgress({ title, percentage, description, color }) {
  const radius = 20;
  const strokeWidth = 4;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const size = (radius + strokeWidth) * 2;

  return (
    <>
      <View style={styles.standardCard}>
        <View style={[styles.circularProgressContainer, { width: size, height: size }]}>
          <Svg width={size} height={size}>
            {/* Background Circle */}
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#E0E0E0"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Progress Circle */}
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={color || '#4CAF50'}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              rotation="-90"
              origin={`${size / 2}, ${size / 2}`}
            />
          </Svg>
          <View style={styles.percentageContainer}>
            <Text style={[styles.circularProgressText, { color: color || '#4CAF50' }]}>{percentage}%</Text>
          </View>
        </View>

        <View style={styles.standardDetails}>
          <Text style={styles.standardTitle}>{title}</Text>
          <Text style={[styles.standardDescription, { color: color || '#4CAF50' }]}>
            {description}
          </Text>
        </View>
      </View>
    </>
  )
}
const styles = StyleSheet.create({
  standardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  circularProgressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  percentageContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circularProgressText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  standardDetails: {
    flex: 1,
  },
  standardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  standardDescription: {
    fontSize: 13,
  },
})
export default CardWithCircleProgress