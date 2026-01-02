import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../utils/constants/Color'

function TransactionCard({ item, type }) {
	return (
		<>
			<View style={styles.transactionItem}>
				<View style={styles.transactionLeft}>
					<View style={styles.transactionInfo}>
						<Text style={styles.transactionTitle}>
							{item.title.length > 40
								? item.title.substring(0, 40) + "..."
								: item.title}
						</Text>
						<Text style={styles.transactionDate}>{item.date}</Text>
						<Text style={styles.transactionStatus}>{item.status}</Text>
					</View>
				</View>
				<View style={styles.transactionRight}>
					<Text
						style={[
							styles.transactionAmount,
							{ color: type === "income" ? "#10B981" : "#EF4444" },
						]}
					>
						{type === "income" ? "+" : "-"}${item.amount}
					</Text>
				</View>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	transactionItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#fff",
		padding: 16,
		borderRadius: 12,
		marginBottom: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 3,
		elevation: 2,
	},
	transactionLeft: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	transactionInfo: {
		gap: 4,
	},
	transactionTitle: {
		fontSize: 12,
		fontWeight: "600",
		color: "#1F2937",
	},
	transactionDate: {
		fontSize: 10,
		color: "#9CA3AF",
	},
	transactionStatus: {
		fontSize: 10,
		color: Colors.success,
		fontWeight: "700",
	},
	transactionRight: {
		flexDirection: "row",
		alignItems: "center",
		gap: 16,
	},
	transactionAmount: {
		fontSize: 16,
		fontWeight: "bold",
	},
})

export default TransactionCard