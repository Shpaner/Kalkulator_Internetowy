using System;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Data;

namespace kalkulator
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        string equation;
        bool wasSymbol;
        string chosenSymbol = "0";
        string lastNumber = "0";
        bool hasCalculated = true;
        bool convert = true;

        // calculate equation
        private string calculateEquation(string equ)
        {
            string last = equ.Substring(equ.Length - 1, 1);
            if (!last.All(Char.IsDigit))
            {
                equ = equ.Remove(equ.Length - 1);
            }
            DataTable dt = new DataTable();
            string calc = dt.Compute(equ, "").ToString();
            return calc;
        }



        // manipulatie number-buttons 
        private void nrButton(string btnNr)
        {
            changeColor("all");

            if (hasCalculated)
            {
                label.Content = btnNr;
                lastNumber = btnNr;
                equation = null;
                equ_label.Visibility = Visibility.Hidden;
            }
            else
            {
                //get last character
                string last = equ_label.Content.ToString().Substring(equ_label.Content.ToString().Length - 1, 1);
                if (last.All(Char.IsDigit) && (label.Content.ToString().Length < 9))
                {
                    label.Content += btnNr;
                    lastNumber += btnNr;
                }
                else
                {
                    if (wasSymbol)
                    {
                        label.Content = btnNr;
                    }
                    else
                    {
                        if (label.Content.ToString().Length < 9)
                        {
                            label.Content += btnNr;
                            lastNumber += btnNr;
                        }
                    }
                }
            }
            wasSymbol = false;
            hasCalculated = false;
        }

        // +, -, *, /
        private void actionButton(string btnSymbol)
        {
            changeColor(btnSymbol);

            if (!hasCalculated)
            {

                if (!wasSymbol)
                {
                    equation += label.Content.ToString().Replace(",", ".") + btnSymbol;
                    equ_label.Content = equation.Replace("/", "÷").Replace("*", "×").Replace(".", ",");
                    lastNumber = label.Content.ToString();
                    string content = Convert.ToString(Double.Parse(calculateEquation(equation.Replace(",", ".").Replace("÷", "/").Replace("×", "*"))));
                    if (content.Length > 9) { content = content.Substring(0, 10); }
                    label.Content = content;
                    chosenSymbol = btnSymbol;
                    equ_label.Visibility = Visibility.Visible;

                }

                else
                {
                    string temp = equ_label.Content.ToString().Substring(0, equ_label.Content.ToString().Length - 1);
                    equation = temp + btnSymbol;
                    equ_label.Content = equation.Replace("/", "÷").Replace("*", "×").Replace(".", ",");
                    chosenSymbol = btnSymbol;
                }
            }

            else
            {
                chosenSymbol = btnSymbol;
                lastNumber = Convert.ToString(Double.Parse(label.Content.ToString()));
                equation = lastNumber + chosenSymbol;
                equ_label.Content = equation.Replace("/", "÷").Replace("*", "×").Replace(".", ",");
            }

            hasCalculated = false;
            wasSymbol = true;
        }



        // -/+ & %
        private void instantButton(double btnSymbol)
        {
            var invertedValue = Convert.ToDouble(label.Content.ToString()) * btnSymbol;
            label.Content = Convert.ToString(invertedValue);
        }

        // ,
        private void toDouble()
        {
            changeColor("all");
            if (!wasSymbol && !label.Content.ToString().Contains(","))
            {
                label.Content += ",";
                hasCalculated = false;
            }
            else if (wasSymbol)
            {
                nrButton("0,");
            }

        }


        private void calculate()
        {
            changeColor("all");

            if (!wasSymbol)
            {
                if (chosenSymbol.Trim() == "/" && label.Content.ToString().Trim() == "0")
                {
                    label.Content = "Błąd!";
                    convert = false;
                }
                else
                {
                    lastNumber = label.Content.ToString();
                    equation += label.Content.ToString();
                }
            }
            else
            {
                equation = label.Content.ToString() + chosenSymbol + lastNumber;
            }

            if (convert)
            {
                equ_label.Content = equation.Replace("/", "÷").Replace("*", "×").Replace(".", ",");
                string content = Convert.ToString(Double.Parse(calculateEquation(equation.Replace("×", "*").Replace(",", "."))));
                if (content.Length > 9) { content = content.Substring(0, 10); }
                label.Content = content;
            }

            wasSymbol = true;
            hasCalculated = true;
            convert = true;
        }

        private void changeColor(string btnSymbol)
        {
            Button[] buttons = new Button[] { btn_plus, btn_min, btn_mul, btn_div };
            Label[] labels = new Label[] { lab_plus, lab_min, lab_mul, lab_div };
            String[] symbols = new String[] { "+", "-", "*", "/" };
            int nr = 5;

            for (int i = 0; i < symbols.Length; i++)
            {
                if (btnSymbol == symbols[i])
                {
                    nr = i;
                    break;
                }
            }

            for (int i = 0; i < buttons.Length; i++)
            {
                if (i == nr)
                {
                    buttons[i].Background = new SolidColorBrush(Colors.White);
                    labels[i].Foreground = new SolidColorBrush(Colors.Orange);
                }
                else
                {
                    buttons[i].Background = new SolidColorBrush(Colors.Orange);
                    labels[i].Foreground = new SolidColorBrush(Colors.White);
                }
            }
        }

        private void clear()
        {
            label.Content = "0";
            equation = null;
            wasSymbol = true;
            chosenSymbol = "0";
            lastNumber = "0";
            equ_label.Content = "0";
            equ_label.Visibility = Visibility.Hidden;
            hasCalculated = true;
            changeColor("all");
        }


        // TODO po wyniku pisac na nowo
        private void onBtnClick(object sender, RoutedEventArgs e)
        {
            Button button = sender as Button;
            string name = button.Name;

            if (name == "btn_0") { nrButton("0"); }
            if (name == "btn_1") { nrButton("1"); }
            if (name == "btn_2") { nrButton("2"); }
            if (name == "btn_3") { nrButton("3"); }
            if (name == "btn_4") { nrButton("4"); }
            if (name == "btn_5") { nrButton("5"); }
            if (name == "btn_6") { nrButton("6"); }
            if (name == "btn_7") { nrButton("7"); }
            if (name == "btn_8") { nrButton("8"); }
            if (name == "btn_9") { nrButton("9"); }

            if (name == "btn_plus") { actionButton("+"); }
            if (name == "btn_min") { actionButton("-"); }
            if (name == "btn_mul") { actionButton("*"); }
            if (name == "btn_div") { actionButton("/"); }

            if (name == "btn_minpl") { instantButton((-1)); }
            if (name == "btn_per") { instantButton((0.01)); }

            if (name == "btn_ac") { clear(); }

            if (name == "btn_d") { toDouble(); }

            if (name == "btn_equ") { calculate(); }

            //test
            Console.WriteLine(name + "   equation: " + equation + "   label: " + label.Content + "   ostatnia liczba: " + lastNumber + "   ostatni symbol: " + chosenSymbol);
        }
    }
}
