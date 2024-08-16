export const darkColors = {
	primary: "rgb(255, 138, 101)", // A warm, soft orange-red for primary actions in dark mode
	onPrimary: "rgb(102, 33, 0)", // Dark brown text on primary color
	primaryContainer: "rgb(153, 67, 51)", // A deeper, muted orange-red for containers
	onPrimaryContainer: "rgb(255, 204, 188)", // Light peachy text on dark container

	secondary: "rgb(38, 166, 154)", // A subdued teal for secondary actions
	onSecondary: "rgb(0, 77, 64)", // Dark teal text on secondary color
	secondaryContainer: "rgb(0, 95, 84)", // Darker teal for container backgrounds
	onSecondaryContainer: "rgb(178, 223, 219)", // Pale teal text on dark teal background

	tertiary: "rgb(186, 104, 200)", // A muted purple for tertiary actions
	onTertiary: "rgb(55, 0, 85)", // Dark purple text on tertiary color
	tertiaryContainer: "rgb(98, 0, 130)", // Dark purple for container backgrounds
	onTertiaryContainer: "rgb(233, 204, 248)", // Light lavender text on dark purple background

	error: "rgb(229, 57, 53)", // A rich crimson for error states
	onError: "rgb(93, 0, 0)", // Dark red text on error color
	errorContainer: "rgb(137, 13, 13)", // Dark red for error container backgrounds
	onErrorContainer: "rgb(255, 205, 210)", // Light pinkish-red text on dark red background

	background: "rgb(18, 18, 18)", // Deep, near-black background
	onBackground: "rgb(245, 245, 245)", // Light gray text on dark background

	surface: "rgb(24, 24, 24)", // A very dark gray for surfaces
	onSurface: "rgb(230, 230, 230)", // Light gray text on surfaces
	surfaceVariant: "rgb(83, 67, 63)", // A slightly lighter gray for surface variants
	onSurfaceVariant: "rgb(216, 194, 188)", // Medium gray text on surface variants

	outline: "rgb(97, 97, 97)", // A dark gray for outlines and borders
	outlineVariant: "rgb(83, 67, 63)",
	shadow: "rgb(0, 0, 0)", // Black for shadows
	scrim: "rgb(0, 0, 0)", // Black for overlays

	inverseSurface: "rgb(245, 245, 245)", // Light gray for inverse surfaces
	inverseOnSurface: "rgb(33, 33, 33)", // Dark brownish-gray text on light surfaces
	inversePrimary: "rgb(255, 87, 34)", // Vibrant orange-red for inverse primary elements

	elevation: {
		level0: "transparent", // Transparent for no elevation
		level1: "rgb(28, 28, 28)", // Very dark gray for low elevation
		level2: "rgb(33, 33, 33)", // Slightly lighter dark gray
		level3: "rgb(38, 38, 38)", // Medium dark gray for more depth
		level4: "rgb(43, 43, 43)", // A slightly lighter dark gray for deeper elevation
		level5: "rgb(48, 48, 48)", // The lightest dark gray for maximum depth
	},

	surfaceDisabled: "rgba(245, 245, 245, 0.12)", // Light gray with transparency for disabled surfaces
	onSurfaceDisabled: "rgba(245, 245, 245, 0.38)", // Light gray with more opacity for disabled text
	backdrop: "rgba(0, 0, 0, 0.4)", // Semi-transparent black for modals and backdrops
	card: "rgb(24, 24, 24)", // Very dark gray for card backgrounds
	border: "rgb(77, 77, 77)", // A medium dark gray for borders
};
//second variant
// export const darkColors = {
// 	primary: "rgb(144, 202, 249)", // A lighter blue for primary actions in dark mode
// 	onPrimary: "rgb(0, 40, 85)", // Dark blue text on primary color
// 	primaryContainer: "rgb(0, 60, 113)", // Darker blue container for primary elements
// 	onPrimaryContainer: "rgb(187, 222, 251)", // Light blue text on dark blue background

// 	secondary: "rgb(255, 224, 130)", // A lighter amber for secondary actions in dark mode
// 	onSecondary: "rgb(102, 60, 0)", // Dark amber text on secondary color
// 	secondaryContainer: "rgb(102, 60, 0)", // Dark amber for container backgrounds
// 	onSecondaryContainer: "rgb(255, 224, 130)", // Light amber text on dark amber background

// 	tertiary: "rgb(129, 199, 132)", // A lighter green for tertiary actions in dark mode
// 	onTertiary: "rgb(0, 77, 64)", // Dark green text on tertiary color
// 	tertiaryContainer: "rgb(0, 77, 64)", // Dark green container for tertiary elements
// 	onTertiaryContainer: "rgb(200, 230, 201)", // Light green text on dark green background

// 	error: "rgb(255, 138, 128)", // A softer red for error states in dark mode
// 	onError: "rgb(105, 0, 5)", // Dark red text on error color
// 	errorContainer: "rgb(105, 0, 5)", // Dark red for error container backgrounds
// 	onErrorContainer: "rgb(255, 205, 210)", // Light red text on dark red background

// 	background: "rgb(18, 18, 18)", // A dark background for the entire app
// 	onBackground: "rgb(240, 240, 240)", // Light gray text on dark background

// 	surface: "rgb(24, 24, 24)", // A slightly lighter dark surface color
// 	onSurface: "rgb(240, 240, 240)", // Light gray text on surfaces
// 	surfaceVariant: "rgb(48, 48, 48)", // A dark gray for surface variants
// 	onSurfaceVariant: "rgb(189, 189, 189)", // Light gray text on surface variants

// 	outline: "rgb(97, 97, 97)", // A dark gray for outlines and borders
// 	shadow: "rgb(0, 0, 0)", // Black for shadows
// 	scrim: "rgb(0, 0, 0)", // Black for overlays

// 	inverseSurface: "rgb(240, 240, 240)", // Light gray for inverse surfaces
// 	inverseOnSurface: "rgb(33, 33, 33)", // Dark gray text on inverse surfaces
// 	inversePrimary: "rgb(33, 150, 243)", // The vibrant blue for inverse primary elements

// 	elevation: {
// 		level0: "transparent", // Transparent for no elevation
// 		level1: "rgb(29, 29, 29)", // Very dark gray for low elevation
// 		level2: "rgb(35, 35, 35)", // Slightly lighter dark gray
// 		level3: "rgb(40, 40, 40)", // Medium dark gray for more depth
// 		level4: "rgb(46, 46, 46)", // Lighter dark gray for deeper elevation
// 		level5: "rgb(56, 56, 56)", // Lightest dark gray for maximum depth
// 	},

// 	surfaceDisabled: "rgba(240, 240, 240, 0.12)", // Light gray with transparency for disabled surfaces
// 	onSurfaceDisabled: "rgba(240, 240, 240, 0.38)", // Light gray with more opacity for disabled text
// 	backdrop: "rgba(0, 0, 0, 0.4)", // Semi-transparent black for modals
// 	card: "rgb(24, 24, 24)", // Slightly lighter dark surface for cards
// 	border: "rgb(97, 97, 97)", // Dark gray for borders
// };

//first variant
// export const darkColors = {
// 	primary: "rgb(120, 220, 119)",
// 	onPrimary: "rgb(0, 57, 10)",
// 	primaryContainer: "rgb(0, 83, 19)",
// 	onPrimaryContainer: "rgb(148, 249, 144)",
// 	secondary: "rgb(255, 184, 112)",
// 	onSecondary: "rgb(74, 40, 0)",
// 	secondaryContainer: "rgb(105, 60, 0)",
// 	onSecondaryContainer: "rgb(255, 220, 190)",
// 	tertiary: "rgb(141, 205, 255)",
// 	onTertiary: "rgb(0, 52, 79)",
// 	tertiaryContainer: "rgb(0, 75, 112)",
// 	onTertiaryContainer: "rgb(202, 230, 255)",
// 	error: "rgb(255, 180, 171)",
// 	onError: "rgb(105, 0, 5)",
// 	errorContainer: "rgb(147, 0, 10)",
// 	onErrorContainer: "rgb(255, 180, 171)",
// 	background: "rgb(26, 28, 25)",
// 	onBackground: "rgb(226, 227, 221)",
// 	surface: "rgb(26, 28, 25)",
// 	onSurface: "rgb(226, 227, 221)",
// 	surfaceVariant: "rgb(66, 73, 64)",
// 	onSurfaceVariant: "rgb(194, 201, 189)",
// 	outline: "rgb(140, 147, 136)",
// 	outlineVariant: "rgb(66, 73, 64)",
// 	shadow: "rgb(0, 0, 0)",
// 	scrim: "rgb(0, 0, 0)",
// 	inverseSurface: "rgb(226, 227, 221)",
// 	inverseOnSurface: "rgb(47, 49, 45)",
// 	inversePrimary: "rgb(0, 110, 28)",
// 	elevation: {
// 		level0: "transparent",
// 		level1: "rgb(31, 38, 30)",
// 		level2: "rgb(34, 43, 33)",
// 		level3: "rgb(36, 49, 35)",
// 		level4: "rgb(37, 51, 36)",
// 		level5: "rgb(39, 55, 38)",
// 	},
// 	surfaceDisabled: "rgba(226, 227, 221, 0.12)",
// 	onSurfaceDisabled: "rgba(226, 227, 221, 0.38)",
// 	backdrop: "rgba(44, 50, 42, 0.4)",
// 	card: "rgb(26, 28, 25)",
// 	border: "rgb(36, 49, 35)",
// };
