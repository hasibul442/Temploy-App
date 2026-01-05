import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../constants/Color";

export function convertTimeStampToTimeAgo(timestamp) {
  const now = new Date();
  const posted = new Date(timestamp);
  const diffMs = now - posted;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0)
    return `Posted ${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  if (diffHours > 0)
    return `Posted ${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  return "Posted just now";
}

export function stripHtmlTags(html) {
  return html.replaceAll(/<[^>]*>/g, "");
}

// Custom hook - must be called at the top level of a component
export function useSystemNavigateSpace(value = 0) {
  const insets = useSafeAreaInsets();
  return insets.bottom + value;
}

export function getStatusColor(status) {
  switch (status) {
    case "pending":
      return Colors.warning;
    case "processing":
      return Colors.info;
    case "completed":
      return Colors.success;
    case "failed":
    case "canceled":
      return Colors.danger;
    default:
      return Colors.gray_400;
  }
}

export function getStatusText(status) {
    switch (status) {
      case 'pending':
        return 'Pending'
      case 'processing':
        return 'Processing'
      case 'completed':
        return 'Completed'
      case 'failed':
        return 'Failed'
      case 'canceled':
        return 'Canceled'
      default:
        return status
    }
}

  // Helper function to get background color based on status
  export function  getStatusBackgroundColor (status) {
    switch (status) {
      case 'completed':
        return Colors.success + '20'
      case 'active':
        return Colors.info + '20'
      case 'failed':
        return Colors.danger + '20'
      default:
        return Colors.gray_100
    }
  }

  // Helper function to get icon color based on status
  export function  getStatusIconColor (status) {
    switch (status) {
      case 'completed':
        return Colors.success
      case 'active':
        return Colors.info
      case 'failed':
        return Colors.danger
      default:
        return Colors.gray_400
    }
  }

    export function getIconForStatus(status) {
    switch (status) {
      case 'completed':
        return 'checkmark-circle'
      case 'active':
        return 'time'
      case 'failed':
        return 'close-circle'
      default:
        return 'ellipse-outline'
    }
  }